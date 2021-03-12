# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $($(0)) || $($(1)) || $($(2)))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $($(0)) || $($(1)) || $($(2)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    a = tmpCallCallee$2(tmpCalleeParam$2);
  }
}
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
const tmpCalleeParam = $(0);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
} else {
  const tmpCalleeParam$1 = $(1);
  SSA_a = $(tmpCalleeParam$1);
  if (SSA_a) {
  } else {
    const tmpCalleeParam$2 = $(2);
    SSA_a = $(tmpCalleeParam$2);
  }
}
const tmpCompProp = SSA_a;
obj[tmpCompProp];
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
