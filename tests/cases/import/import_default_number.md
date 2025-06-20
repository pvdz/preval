# Preval test case

# import_default_number.md

> Import > Import default number
>
> Import statements need special care in our system and our tests

The code frames should have a filename that matches the exact string that is used in imports. And just work.

Also, defaults should work :p

## Input

`````js filename=intro
import x from 'x';
$(x);
`````

`````js filename=x
export default 100;
`````


## Settled


`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const tmpAnonDefaultExport /*:number*/ /*truthy*/ = 100;
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
import { default as x } from "x";
$( x );
`````

`````js filename=x
const a = 100;
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
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
