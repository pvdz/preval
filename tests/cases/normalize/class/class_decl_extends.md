# Preval test case

# class_decl_extends.md

> Normalize > Class > Class decl extends
>
> Class decls should become expressions

## Input

`````js filename=intro
class x extends y {}
$(x);
`````


## Settled


`````js filename=intro
const x /*:class*/ = class extends y {};
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(class extends y {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {

};
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
