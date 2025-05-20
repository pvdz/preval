# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident computed complex complex assign complex member
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = ($(b)[$("c")] = $(b)[$("d")]);
    $(a, b);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, b);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, b);
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
b[c] = f;
$( f, a );
$( "fail1" );
$( "fail2" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20, { c: '20', d: '20' }
 - 6: 'fail1'
 - 7: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
