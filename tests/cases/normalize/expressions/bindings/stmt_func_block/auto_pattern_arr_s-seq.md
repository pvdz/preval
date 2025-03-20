# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let [a] = ($(10), $(20), [1, 2]);
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(10);
$(20);
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
$( 1 );
$( undefined );
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
