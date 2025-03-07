# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident delete prop s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
$(a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
$(delete arg.y, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = arg;
let a = delete tmpDeleteObj.y;
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
