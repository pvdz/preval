# Preval test case

# default_yes_yes_no__arr_obj_str.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes yes no  arr obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: 'abc', y: 2, z: 3 }, 20, 30]);
$(x);
`````


## Settled


`````js filename=intro
x = `abc`;
$(`abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = `abc`;
$(`abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
x = "abc";
$( "abc" );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
