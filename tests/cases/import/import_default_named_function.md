# Preval test case

# import_default_named_function.md

> Import > Import default named function
>
> Import statements need special care in our system and our tests

Named functions are default exported as live bindings.

This means that a change to the value of the binding should be reflected by the import.

(Exported functions are defined as `let` bindings.)

## Input

`````js filename=intro
import x from 'x';
$(x); // 10
`````

`````js filename=x
export default function f() {}
f = 10;
`````


## Settled


`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const f /*:number*/ /*truthy*/ = 10;
export { f as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const f = 10;
export { f as default };
`````


## PST Settled
With rename=true

`````js filename=intro
import { default as x } from "x";
$( x );
`````

`````js filename=x
const a = 10;
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
let f = function () {
  debugger;
  return undefined;
};
f = 10;
export { f as default };
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
