# Preval test case

# with_ident_exportvar.md

> Object literal > Inlining > With ident exportvar
>
>

## Input

`````js filename=intro
import e from 'xyz';
const obj = {f: e};
$(obj.f);
`````

`````js filename=xyz
$('nope');
`````


## Settled


`````js filename=intro
import { default as e } from 'xyz';
$(e);
`````

`````js filename=xyz
$(`nope`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
import { default as e } from 'xyz';
$(e);
`````

`````js filename=xyz
$(`nope`);
`````


## PST Settled
With rename=true

`````js filename=intro
import { default as e } from "xyz";
$( e );
`````

`````js filename=xyz
$( "nope" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
import { default as e } from 'xyz';
const obj = { f: e };
let tmpCalleeParam = obj.f;
$(tmpCalleeParam);
`````

`````js filename=xyz
$(`nope`);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

e


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
