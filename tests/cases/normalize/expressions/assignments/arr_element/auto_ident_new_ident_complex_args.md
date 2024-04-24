# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Arr element > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) + (a = new $($(1), $(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) + (a = new $($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpBinBothLhs = a;
const tmpNewCallee$1 = $;
const tmpCalleeParam$5 = $(1);
const tmpCalleeParam$7 = $(2);
a = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
let a = new $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpBinBothLhs = a;
const tmpCalleeParam$5 = $(1);
const tmpCalleeParam$7 = $(2);
a = new $(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = new $( a, b );
const d = c;
const e = $( 1 );
const f = $( 2 );
c = new $( e, f );
const g = d + c;
$( g );
$( c );
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
 - 7: '[object Object][object Object]'
 - 8: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
