# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Binary left > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new $($(1), $(2)) + $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new $($(1), $(2)) + $(100);
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
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpBinBothLhs = new $(tmpCalleeParam, tmpCalleeParam$1);
const tmpBinBothRhs = $(100);
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
const d = $( 100 );
c + d;
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
