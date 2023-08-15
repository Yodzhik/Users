const FlexBox = () => {
    return (
        <div style={{display: 'flex', height: '100%', flexDirection: 'column', flex: '1 1 auto'}}>
            <div className="px-5 py-3">
                Navbar
            </div>
            <div style={{flexGrow: 3}}>
                <h1>Content</h1>
            </div>
        </div>
    )
}

export default FlexBox