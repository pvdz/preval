# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpThrowArg = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpThrowArg = tmpCallCallee(tmpCalleeParam);
}
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let tmpThrowArg = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpThrowArg = 60;
} else {
  const tmpCalleeParam = $(100);
  tmpThrowArg = $(tmpCalleeParam);
}
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - eval returned: ('<crash[ 60 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
