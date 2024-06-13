# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Arr element > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new $($(1), $(2)) + new $($(1), $(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new $($(1), $(2)) + new $($(1), $(2));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpNewCallee$1 = $;
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const tmpBinBothRhs = new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = new $(tmpCalleeParam, tmpCalleeParam$1);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const tmpBinBothRhs = new $(tmpCalleeParam$3, tmpCalleeParam$5);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
const d = $( 1 );
const e = $( 2 );
const f = new $( d, e );
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
