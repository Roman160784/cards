import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {
    addPackofCardsTC,
    CardsPacksReducerType,
    fetchPackCardsTC,
    removePackOfCardsTC, setMinMaxCarsInPacksAC, sortAllMyPacksAC, sortPacksAC,
} from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';
import {PackOfCards} from "./a7-1 PackOfCards/PackOfCards";
import classes from './../a7-CardPacks/CardsPacks.module.css'
import {Paginator} from "./Paginator/Paginator";
import {Box, Slider} from "@mui/material";
import {useDebounce, useUpdateEffect} from "usehooks-ts";
import {SearchPacks} from "../c6-SearchPacks/SearchPacks";
import {Modal1} from "./Modal/Modal1";




export const CardsPacks = () => {

    const isLogin = useSelector<RootReducerType, boolean>(state => state.login.isLogin)
    const error = useSelector<RootReducerType, string | null>(state => state.cardsPacks.error)
    const {
        pageCount, page, cardPacksTotalCount, cardsPacks, currentPackName, myCards, maxCardsCount, minCardsCount, sortPacks,
    } = useSelector<RootReducerType, CardsPacksReducerType>(state => state.cardsPacks)
    const user_id = useSelector<RootReducerType, string>(state => state.profile.user._id)


    const dispatch = useDispatch()

    // const [isOpened, setOpened] = useState<boolean>(false)
    const [value, setValue] = useState([0, 30]);
    const [cardsView, setCardsView] = useState<'my' | 'all'>('all')
    const debouncedValue = useDebounce<number[]>(value, 1000)

    // const [show, setShow] = useState(false);
    // const [answer, setAnswer] = useState('test answer');
    //
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [name, setName] = useState<string>('')

    useEffect(() => {
        dispatch(fetchPackCardsTC())
    }, [pageCount, page, currentPackName, myCards, maxCardsCount, minCardsCount, sortPacks])


    
    const addPack = useCallback((name: string) => {
        dispatch(addPackofCardsTC({name}))
        setName('')
        setModalActive(false)
    }, [dispatch])
    const onChangeModalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onKeyPressModalHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') addPack(name)
    }


    const removePackOfCards = useCallback((packId: string) => {
        dispatch(removePackOfCardsTC(packId));
    }, [dispatch])


    // for sort
    const allPacksHandler = () => {
        setCardsView('all')
        dispatch(sortAllMyPacksAC('all'))
    }
    const MyPacksHandler = () => {
        setCardsView('my')
        dispatch(sortAllMyPacksAC('my'))
    }

    const sortPacksMinCardstHandler = () => {
        dispatch(sortPacksAC('1cardsCount'))
    }
    const sortPacksMaxCardstHandler = () => {
        dispatch(sortPacksAC('0cardsCount'))
    }

    //for Slider
    useUpdateEffect(() => {
        dispatch((setMinMaxCarsInPacksAC(value[0], value[1])))
    }, [debouncedValue])


    const handleChange = (event: any,  newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.blockCards}>
            <div className={classes.boxSearchButton}>
                <SearchPacks/>
                <button
                    onClick={() => setModalActive(true)}
                    className={cardsView === 'all' ? classes.btnDisabled : classes.btnHandler}
                    disabled={cardsView === 'all'}
                >
                    Add new pack
                </button>
            </div>
            <Modal1 active={modalActive} setActive={setModalActive}>
                <div className={classes.modalTitle}>Add new pack</div>
                <input
                    value={name}
                    onKeyPress={onKeyPressModalHandler}
                    onChange={onChangeModalHandler}
                    className={classes.modalInput}
                    placeholder={'Enter your new pack name...'}
                    autoFocus
                />
                <button className={classes.modalButton} onClick={() => addPack(name)}>save</button>
            </Modal1>
            <div className={classes.boxButtonAndSlider}>
                <div>
                    <button className={classes.btnHandler} onClick={allPacksHandler}>All</button>
                    <button className={classes.btnHandler} onClick={MyPacksHandler}>My</button>
                </div>
                <div>
                    <Box sx={{width: 300, marginRight: "10px", textAlign: 'center'}}>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </div>
            </div>
            <div className={classes.boxCardsPack}>
                <div className={classes.blockNameCards}>
                    <span>Name</span>
                    <span>Cards Count<span>
                        <i className={classes.up} onClick={sortPacksMinCardstHandler}></i>
                        <i className={classes.down} onClick={sortPacksMaxCardstHandler}></i>
                    </span>
                    </span>
                    <span>Updated</span>
                    <span>Actions</span>
                </div>
                {
                    cardsPacks.map(pack => {
                        return (
                            <div key={pack._id}>
                                <PackOfCards
                                    userId={user_id}
                                    packId={pack._id}
                                    cardPackUserId={pack.user_id}
                                    name={pack.name}
                                    cardsCount={pack.cardsCount}
                                    updated={pack.updated}
                                    path={pack.path}
                                    title={'Edit the name of pack'}
                                    removePackOfCards={removePackOfCards}
                                />
                            </div>
                        )
                    })
                }

            </div>
            <Paginator
                cardPacksTotalCount={cardPacksTotalCount}
                page={page}
                value={value}
                pageCount={pageCount}
                userId={user_id}
                cardsView={cardsView}
            />
            {error && <div className={classes.errors}>{error}</div>}
        </div>
    )

}

