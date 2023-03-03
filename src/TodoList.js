import React, {Component} from 'react';

export default class TodoList extends Component {

    constructor(props) {
        super(props)
        this.addItem = this.addItem.bind(this);
        this.strikeItem = this.strikeItem.bind(this);
        this.reset();
    }

    reset() {
        this.state = {
            listItems: [],
            remaining: 0
        }
    }

    addItem() {
        console.log(this.textInputRef.value)
        const newItem = {
            value: this.textInputRef.value,
            strike: false
        };

        this.setState({
            ...this.state,
            listItems: [...this.state.listItems, newItem],
            remaining: this.state.remaining + 1
        })

        this.textInputRef.value = '';
    }

    strikeItem(i) {
        const items = this.state.listItems;
        items.forEach((item, index) => {
            if (index === i) {
                item.strike = !item.strike
            }
        })
        const remaining = items.filter(item => !item.strike).length;
        this.setState({
            ...this.state,
            listItems: [...items],
            remaining
        })
    }

    render() {
        return (
            <>
                <div>
                    <h2>Todo List</h2>
                    <input type="text" ref={elem => this.textInputRef = elem}/>
                    <button onClick={this.addItem}>Add</button>
                    {
                        this.state.listItems.length > 0 &&
                        <ul>
                            {
                                this.state.listItems.map((item, i) => <li key={i} onClick={() => this.strikeItem(i)} className={item.strike ? 'is-done' : null}>{item.value}</li>)
                            }
                        </ul>
                    }
                    {
                        this.state.listItems.length > 0 &&
                        <p className={'task-counter'}>{this.state.remaining} remaining out of {this.state.listItems.length}</p>
                    }
                </div>
                <style>
                    {`
                        .is-done {
                            text-decoration: line-through;    
                        }
                    `}
                </style>
            </>
        );
    }
}
