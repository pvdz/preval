# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > statement > throw > auto_ident_cond_simple_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
if (1) {
  40;
  50;
  tmpThrowArg = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpThrowArg = tmpCallCallee(tmpCalleeParam);
}
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
tmpThrowArg = 60;
throw tmpThrowArg;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 60 ]>')

Normalized calls: Same

Final output calls: Same
