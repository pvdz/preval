# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Arr element > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1), $(2)) + $($(1), $(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(1), $(2)) + $($(1), $(2));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = $(tmpCalleeParam, tmpCalleeParam$1);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const tmpBinBothRhs = $(tmpCalleeParam$3, tmpCalleeParam$5);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
const d = $( 1 );
const e = $( 2 );
const f = $( d, e );
c + f;
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 2
 - 6: 1, 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
