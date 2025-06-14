# Preval test case

# import_default_anon_func.md

> Import > Import default anon func
>
> Import statements need special care in our system and our tests

The code frames should have a filename that matches the exact string that is used in imports. And just work.

Their name should also be `'*default*'`, and we have no alternative transform available for this.

## Input

`````js filename=intro
import x from 'x';
$(x());
$(x.name);
`````

`````js filename=x
export default function() {
  return 100;
};
`````


## Settled


`````js filename=intro
import { default as x } from 'x';
const tmpCalleeParam /*:unknown*/ = x();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = x.name;
$(tmpCalleeParam$1);
`````

`````js filename=x
const tmpAnonDefaultExport /*:()=>unknown*/ = function () {
  debugger;
  return 100;
};
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
import { default as x } from 'x';
$(x());
$(x.name);
`````

`````js filename=x
const tmpAnonDefaultExport = function () {
  return 100;
};
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
import { default as x } from "x";
const a = x();
$( a );
const b = x.name;
$( b );
`````

`````js filename=x
const a = function() {
  debugger;
  return 100;
};
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
import { default as x } from 'x';
let tmpCalleeParam = x();
$(tmpCalleeParam);
let tmpCalleeParam$1 = x.name;
$(tmpCalleeParam$1);
`````

`````js filename=x
const tmpAnonDefaultExport = function () {
  debugger;
  return 100;
};
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
