const { useState } = React

export function LongTxt({ txt }, { length = 100 }) {
    const [isShowingMore, setIsShowingMore] = useState(false)

    function getShortTxt() {
        if (txt.length > length) return txt.slice(0, length) + ' '
        return txt + ' '
    }

    function onShowMore() {
        setIsShowingMore(prevIsShowing => !prevIsShowing)
    }

    return (
        <div className="long-txt">
            {!isShowingMore && getShortTxt()}
            {isShowingMore && txt + ' '}
            {<span onClick={onShowMore} className="show-more">{isShowingMore ? 'Show less..' : 'Show more..'}</span>}
        </div>
    )
}