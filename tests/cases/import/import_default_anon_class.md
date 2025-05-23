# Preval test case

# import_default_anon_class.md

> Import > Import default anon class
>
> Import statements need special care in our system and our tests

Anonymous functions are exported as frozen bindings. There is no way to change them, anyways.

Their name should also be `'default'`, and we have no alternative transform available for this. We could use Object.defineProperty though.

## Input

`````js filename=intro
import x from 'x';
$(x);
$(x.name);
`````

`````js filename=x
export default class X {};
`````


## Settled


`````js filename=intro
import { default as x } from 'x';
$(x);
const tmpCalleeParam /*:unknown*/ = x.name;
$(tmpCalleeParam);
`````

`````js filename=x
const X /*:class*/ = class {};
export { X };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
import { default as x } from 'x';
$(x);
$(x.name);
`````

`````js filename=x
const X = class {};
export { X };
`````


## PST Settled
With rename=true

`````js filename=intro
import { default as x } from "x";
$( x );
const a = x.name;
$( a );
`````

`````js filename=x
const a = class   {

};
export { a as X };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
import { default as x } from 'x';
$(x);
let tmpCalleeParam = x.name;
$(tmpCalleeParam);
`````

`````js filename=x
let X = class {};
export { X };
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
