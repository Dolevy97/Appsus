export function Chart({ data }) {
    return (
        <ul className="chart">
            {
                data.map((item) =>
                    <li key={item.title}>
                        <span
                            title={item.title}
                            style={{ height: item.value*5 + '%' }}
                        >
                            {item.value}
                        </span>
                    </li>)
            }
        </ul>
    )
}