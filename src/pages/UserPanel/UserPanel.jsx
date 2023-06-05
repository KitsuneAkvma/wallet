import css from './UserPanel.module.css';
import { UserInfo } from '../../components/Dashboard/Home/UserPanel/UserInfo';
import { UserOptions } from '../../components/Dashboard/Home/UserPanel/UserOptions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGlobalIsUserPanelOpen } from '../../redux/selectors';
import { updateIsUserPanelOpen } from '../../redux/Slices/global/globalSlice';
export const UserPanel = () => {
  const options = [
    { name: 'Information', component: <UserInfo /> },
    { name: 'Settings', component: <UserOptions /> },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectGlobalIsUserPanelOpen);
  const handleOnNavChange = e => {
    const target = e.currentTarget;
    setSelectedOption(options[target.dataset.index]);
  };
  const handleClose = () => {
    dispatch(updateIsUserPanelOpen(false));
  };
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = event => {
      if (event.target.classList.contains(css.userPanel)) {
        handleClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <>
      {isModalOpen && (
        <div className={css.userPanel}>
          <div className={css.userPanel__modal} aria-label="User panel window">
            <aside className={css.userPanel__navigation} aria-label="User panel navigation">
              {' '}
              <ul className={css.navigation__list}>
                {options.map((option, index) => {
                  console.log({ option, selectedOption });
                  return (
                    <li
                      key={option.name}
                      data-index={index}
                      className={
                        option.name === selectedOption.name
                          ? css.navigation__item_active
                          : css.navigation__item
                      }
                      onClick={handleOnNavChange}
                      role="button"
                    >
                      {option.name}
                    </li>
                  );
                })}
              </ul>
            </aside>
            <main className={css.userPanel__content} aria-label="User panel content">
              {selectedOption.component}
            </main>
          </div>
        </div>
      )}
    </>
  );
};
