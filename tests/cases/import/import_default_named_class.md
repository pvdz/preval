# Preval test case

# import_default_named_class.md

> Import > Import default named class
>
> Import statements need special care in our system and our tests

Named classes are default exported as live bindings.

This means that a change to the value of the binding should be reflected by the import.

(Classes are defined as `let` bindings.)

## Input

`````js filename=intro
import x from 'x';
$(x); // 10
`````

`````js filename=x
export default class X {};
X = 10;
`````


## Settled


`````js filename=intro
import { default as x } from 'x';
$(x);
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
`````

`````js filename=x
const a = class   {

};
export { a as X };
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
