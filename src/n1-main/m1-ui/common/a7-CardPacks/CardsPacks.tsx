import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../../n3-redux/a1-store/store";
import {
    addPackofCardsTC,
    CardsPacksReducerType,
    fetchPackCardsTC,
    removePackOfCardsTC, setCurrentPageAC, setMinMaxCarsInPacksAC, sortAllMyPacksAC, sortPacksAC,
} from '../../../../n3-redux/a8-CardsPacksReducer/CardsPacksReducer';
import {PackOfCards} from "./a7-1 PackOfCards/PackOfCards";
import classes from './../a7-CardPacks/CardsPacks.module.css'
import {Paginator} from "./Paginator/Paginator";
import {Box, Slider} from "@mui/material";
import {useDebounce, useUpdateEffect} from "usehooks-ts";
import {SearchPacks} from "../c6-SearchPacks/SearchPacks";
import {Modal} from "../../../../Utils/Modal/Modal";
import {toast} from "react-hot-toast";
import {setAppErrorAC} from "../../../../n3-redux/a7-AppReducer/AppReducer";


export const CardsPacks = () => {

    const error = useSelector<RootReducerType, string | null>(state => state.app.authError)
    const {
        pageCount,
        page,
        cardPacksTotalCount,
        cardsPacks,
        currentPackName,
        myCards,
        maxCardsCount,
        minCardsCount,
        sortPacks,
    } = useSelector<RootReducerType, CardsPacksReducerType>(state => state.cardsPacks)
    const user_id = useSelector<RootReducerType, string>(state => state.profile.user._id)

    const dispatch = useDispatch()

    const [value, setValue] = useState([0, 30]);
    const [isClass, isSetClass] = useState(false);
    const [cardsView, setCardsView] = useState<'my' | 'all'>('all')
    const debouncedValue = useDebounce<number[]>(value, 1000)

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [name, setName] = useState<string>('')

    useEffect(() => {
        dispatch(fetchPackCardsTC())
    }, [pageCount, page, currentPackName, myCards, maxCardsCount, minCardsCount, sortPacks])


    const addPack = useCallback((name: string) => {
        if (name.trim() !== '') {
            dispatch(addPackofCardsTC({name}))
            setName('')
            setModalActive(false)
        }
    }, [dispatch])
    const onChangeModalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onKeyPressModalHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addPack(name)
    }


    const removePackOfCards = useCallback((packId: string) => {
        dispatch(removePackOfCardsTC(packId));
    }, [dispatch])


    // for sort
    const allPacksHandler = () => {
        setCardsView('all')
        dispatch(sortAllMyPacksAC('all'))
        isSetClass(!isClass)
    }
    const MyPacksHandler = () => {
        setCardsView('my')
        dispatch(sortAllMyPacksAC('my'))
        dispatch(setCurrentPageAC(1))
        isSetClass(!isClass)
    }

    const sortPacksMinCardsHandler = () => {
        dispatch(sortPacksAC('1cardsCount'))
    }
    const sortPacksMaxCardsHandler = () => {
        dispatch(sortPacksAC('0cardsCount'))
    }

    const SortPackNameMinCards = () => {
        dispatch(sortPacksAC('1name'))
    }

    const SortPackNameMaxCards = () => {
        dispatch(sortPacksAC('0name'))
    }

    const SortPackUpdatedMinCards = () => {
        dispatch(sortPacksAC('0updated'))
    }

    const SortPackUpdatedMaxCards = () => {
        dispatch(sortPacksAC('1updated'))
    }
    const notify = () => {
        if (error) {
            toast.error(error)
            dispatch(setAppErrorAC(null))
        }
    }

    //for Slider
    useUpdateEffect(() => {
        dispatch((setMinMaxCarsInPacksAC(value[0], value[1], page)))
    }, [debouncedValue])


    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.flexBlockCards}>
            <div className={classes.sidebar}>
                <div className={classes.boxButtonAndSlider}>
                    <div className={classes.textPacksCards}>Show packs cards</div>
                    <div className={classes.btnAllMy}>
                        <button className={isClass ? classes.btnHandler : classes.active}
                                onClick={allPacksHandler}>All
                        </button>
                        <button className={!isClass ? classes.btnHandler : classes.active}
                                onClick={MyPacksHandler}>My
                        </button>
                    </div>
                    <div className={classes.boxSlider}>
                        <div>Number of cards</div>
                        <Box sx={{width: 250, margin: "20px 0 0 15px", textAlign: 'center'}}>
                            <Slider
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    </div>
                </div>
            </div>
            <div className={classes.blockCards}>
                <div className={classes.boxSearchButton}>
                    <SearchPacks/>
                    <button
                        onClick={() => setModalActive(true)}
                        className={cardsView === 'all' ? classes.btnDisabled : classes.btnHandlerAdd}
                        disabled={cardsView === 'all'}
                    >
                        Add new pack
                    </button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <div className={classes.modalTitle}>Add new pack</div>
                    <div className={classes.modalBox}>
                        <input
                            value={name}
                            onKeyPress={onKeyPressModalHandler}
                            onChange={onChangeModalHandler}
                            className={classes.modalInput}
                            placeholder={'Enter your new pack name...'}
                            autoFocus
                        />
                        <button className={classes.modalButton} onClick={() => addPack(name)}>save</button>
                    </div>
                </Modal>
                <div className={classes.boxCardsPack}>
                    <div className={classes.blockNameCards}>
                    <span>Name
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={SortPackNameMinCards}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={SortPackNameMaxCards}>
                        </i>
                    </span>
                    </span>
                        <span>Cards Count
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={sortPacksMinCardsHandler}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={sortPacksMaxCardsHandler}>
                        </i>
                    </span>
                    </span>
                        <span>Updated
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={SortPackUpdatedMinCards}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={SortPackUpdatedMaxCards}>
                        </i>
                    </span>
                    </span>
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
                                        updated={new Date(pack.updated).toLocaleDateString()}
                                        path={pack.path}
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
                {notify()}
            </div>
        </div>
    )

}

