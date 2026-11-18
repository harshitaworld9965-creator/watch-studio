const straps = [
    { id : 'orange', label:'Orange', color:'#d76b30'},
    {id:'graphite', label:'Graphite', color:'#454747'},
    {id:'silver', label:'Silver', color:'#b7bab8'},
]

export default function StrapPicker({ selectedStrap, onSelect}) {
    return (
        <div className="strap-picker" role="group" aria-label="Strap color">
            {straps.map((strap) => (
                <button 
                key={strap.id}
                type="button"
                className="strap-picker__button"
                aria-pressed={selectedStrap === strap.id}
                onClick={() => onSelect(strap.id)}
                >
                    <span
                    className="strap-picker__swatch"
                    style={{backgroundColor:strap.color}}
                    aria-hidden="true"
                    />
                    <span>{strap.label}</span>
                </button>
            ))}
        </div>
    )
}