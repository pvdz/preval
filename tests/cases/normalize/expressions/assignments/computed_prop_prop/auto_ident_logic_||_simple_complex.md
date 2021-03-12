# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic || simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = 0 || $($(1)))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = 0 || $($(1)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = 0;
if (a) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
let SSA_a = 0;
if (SSA_a) {
} else {
  const tmpCalleeParam = $(1);
  SSA_a = $(tmpCalleeParam);
}
const tmpCompProp = SSA_a;
obj[tmpCompProp];
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
