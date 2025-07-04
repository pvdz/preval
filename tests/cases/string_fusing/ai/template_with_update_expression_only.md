# Preval test case

# template_with_update_expression_only.md

> String fusing > Ai > Template with update expression only
>
> Test templates with update expressions that should not be resolved statically

## Options

- reducersOnly: stringFusing

## Input

`````js filename=intro
let counter = 0;
const template = `count: ${++counter}`;
const result = template + "end";
$(result);
`````


## Settled


`````js filename=intro
let counter /*:number*/ = 0;
const tmpBinBothLhs /*:string*/ /*truthy*/ = `count: `;
const tmpPostUpdArgIdent /*:number*/ = $coerce(counter, `number`);
counter = tmpPostUpdArgIdent + 1;
let tmpCalleeParam /*:number*/ = counter;
const tmpBinBothRhs /*:string*/ = $coerce(counter, `string`);
const tmpBinLhs /*:string*/ /*truthy*/ = `count: ${tmpBinBothRhs}`;
const template /*:string*/ = $coerce(tmpBinLhs, `plustr`);
const tmpStringConcatR /*:string*/ = $coerce(template, `plustr`);
const result /*:string*/ /*truthy*/ = `${tmpStringConcatR}end`;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let counter = 0;
const tmpBinBothLhs = `count: `;
counter = Number(counter) + 1;
let tmpCalleeParam = counter;
const tmpStringConcatR = `count: ${counter}` + `` + ``;
$(`${tmpStringConcatR}end`);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = "count: ";
const c = $coerce( a, "number" );
a = c + 1;
let d = a;
const e = $coerce( a, "string" );
const f = `count: ${e}`;
const g = $coerce( f, "plustr" );
const h = $coerce( g, "plustr" );
const i = `${h}end`;
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 0;
const tmpBinBothLhs = `count: `;
const tmpPostUpdArgIdent = $coerce(counter, `number`);
counter = tmpPostUpdArgIdent + 1;
let tmpCalleeParam = counter;
const tmpBinBothRhs = $coerce(counter, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const template = $coerce(tmpBinLhs, `plustr`);
const tmpStringConcatR = $coerce(template, `plustr`);
const result = `${tmpStringConcatR}end`;
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'count: 1end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
