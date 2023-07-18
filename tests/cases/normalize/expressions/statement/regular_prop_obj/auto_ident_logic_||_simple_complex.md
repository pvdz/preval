# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(0 || $($(1))).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(0 || $($(1))).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = 0;
if (tmpCompObj) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpCompObj = tmpCallCallee(tmpCalleeParam);
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCompObj = $(tmpCalleeParam);
tmpCompObj.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
b.a;
const c = {
a: 999,
b: 1000
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
