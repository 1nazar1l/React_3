import React from 'react';
import {Skeleton} from '../Skeleton/Skeleton';
import {User} from './User';
import Search from "../Icons/Search";

export const Users = ({items, isLoading, users, onChangeSearchValue, searchValue, onClickInvites, isInvites, onClickSendInvites}) => {
    return (
        <>
            <div className="search">
                <Search/>
                <input type="text" value={searchValue}  placeholder="Найти пользователя..." onChange={onChangeSearchValue}/>
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            ) : (
                <ul className="users-list">
                    {users.filter((user) => {
                      let fullName = (user.first_name + user.last_name).toLowerCase()
                      let email = (user.email).toLowerCase()
                      if (fullName.includes(searchValue.toLowerCase()) || email.includes(searchValue.toLowerCase())) {
                        return true
                      }
                    }).map((items) => (
                        <User id={items.id} onClickInvites={onClickInvites} isInvites={isInvites} name={items.first_name} lastName={items.last_name} avatar={items.avatar} email={items.email} />
                    ))
                    }
                </ul>
            )}
            <button disabled={isInvites.length == 0} className="send-invite-btn" onClick={onClickSendInvites}>Отправить приглашение</button>

            
        </>
    );
};
