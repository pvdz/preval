# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 && $($(1))).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(1 && $($(1))).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = 1;
if (tmpCompObj) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpCompObj = tmpCallCallee(tmpCalleeParam);
} else {
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpCompObj = $(tmpCalleeParam);
tmpCompObj.a;
$(a);
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
