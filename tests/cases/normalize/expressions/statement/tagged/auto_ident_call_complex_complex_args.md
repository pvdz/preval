# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Tagged > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${$($)($(1), $(2))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $($)($(1), $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCallee$1 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCallee$1 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ "before ", " after",, ];
const c = $( $ );
const d = $( 1 );
const e = $( 2 );
const f = c( d, e );
$( b, f );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: ['before ', ' after'], 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
