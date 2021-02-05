# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > statement > throw > auto_ident_logic_and_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 && $($(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = 1;
if (tmpThrowArg) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpThrowArg = tmpCallCallee(tmpCalleeParam);
}
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = 1;
if (tmpThrowArg) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpThrowArg = tmpCallCallee(tmpCalleeParam);
}
throw tmpThrowArg;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
