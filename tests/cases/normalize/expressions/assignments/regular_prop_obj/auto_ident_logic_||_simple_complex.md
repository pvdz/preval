# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident logic || simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = 0 || $($(1))).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = 0 || $($(1))).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
a = 0;
if (a) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 0;
if (SSA_a) {
} else {
  const tmpCalleeParam = $(1);
  SSA_a = $(tmpCalleeParam);
}
const tmpCompObj = SSA_a;
tmpCompObj.a;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
