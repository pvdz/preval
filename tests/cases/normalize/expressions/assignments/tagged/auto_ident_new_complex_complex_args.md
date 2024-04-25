# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new ($($))($(1), $(2)))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = new ($($))($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpNewCallee = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
a = new tmpNewCallee(tmpCalleeParam$3, tmpCalleeParam$5);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const a = new tmpNewCallee(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = new a( b, c );
const e = [ "before ", " after" ];
$( e, d );
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
 - 5: ['before ', ' after'], {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
