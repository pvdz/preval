# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Template > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(`before  ${({ b } = $({ b: $(2) }))}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$3 /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
const b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const tmpBinBothRhs /*:string*/ = $coerce(tmpNestedAssignObjPatternRhs, `string`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
const b = tmpNestedAssignObjPatternRhs.b;
$(`before  ${tmpNestedAssignObjPatternRhs}  after`);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = $coerce( c, "string" );
const f = `before  ${e}  after`;
$( f );
const g = {
  a: 999,
  b: 1000,
};
$( g, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
let tmpCalleeParam$1 = undefined;
const tmpObjLitVal = $(2);
let tmpCalleeParam$3 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$3);
b = tmpNestedAssignObjPatternRhs.b;
tmpCalleeParam$1 = tmpNestedAssignObjPatternRhs;
const tmpBinBothRhs = $coerce(tmpNestedAssignObjPatternRhs, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 'before [object Object] after'
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
