# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = (10, 20, $(30)) ? $(2) : $($(100))).a;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = (10, 20, $(30)) ? $(2) : $($(100))).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
const tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
