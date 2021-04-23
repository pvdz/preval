# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 && $($(1))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = 1 && $($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
} else {
}
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpSSA_a$1 = $(tmpCalleeParam);
let x = undefined;
for (x in tmpSSA_a$1) {
}
$(tmpSSA_a$1);
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
