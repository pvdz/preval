# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Binary both > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) + (a = new ($($))($(1), $(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new ($($))($(1), $(2))) + (a = new ($($))($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpBinBothLhs = a;
const tmpNewCallee$1 = $($);
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
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
let a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpBinBothLhs = a;
const tmpNewCallee$1 = $($);
const tmpCalleeParam$5 = $(1);
const tmpCalleeParam$7 = $(2);
a = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
let d = new a( b, c );
const e = d;
const f = $( $ );
const g = $( 1 );
const h = $( 2 );
d = new f( g, h );
const i = e + d;
$( i );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: '<$>'
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: '[object Object][object Object]'
 - 10: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
