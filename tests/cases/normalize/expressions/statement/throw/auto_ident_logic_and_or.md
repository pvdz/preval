# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > statement > throw > auto_ident_logic_and_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw ($($(1)) && $($(1))) || $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpThrowArg = tmpCallCallee(tmpCalleeParam);
if (tmpThrowArg) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpThrowArg = tmpCallCallee$1(tmpCalleeParam$1);
}
if (tmpThrowArg) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpThrowArg = tmpCallCallee$2(tmpCalleeParam$2);
}
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpThrowArg = $(tmpCalleeParam);
if (tmpThrowArg) {
  const tmpCalleeParam$1 = $(1);
  tmpThrowArg = $(tmpCalleeParam$1);
}
if (tmpThrowArg) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpThrowArg = $(tmpCalleeParam$2);
}
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
