# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Tagged > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${delete ($(1), $(2), arg).y} after`;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], delete ($(1), $(2), arg).y);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpCalleeParam$1 = delete tmpDeleteObj.y;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
$(1);
$(2);
const tmpCalleeParam$1 = delete arg.y;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
const c = [ "before ", " after" ];
$( 1 );
$( 2 );
const d = deletea.y;
$( c, d );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: ['before ', ' after'], true
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
