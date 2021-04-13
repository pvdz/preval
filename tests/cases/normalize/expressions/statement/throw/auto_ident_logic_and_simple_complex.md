# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 && $($(1));
$(a);
`````

## Pre Normal

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
} else {
}
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let tmpThrowArg = 1;
if (tmpThrowArg) {
  const tmpCalleeParam = $(1);
  tmpThrowArg = $(tmpCalleeParam);
} else {
}
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
