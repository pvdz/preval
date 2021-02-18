# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > assignments > throw > auto_ident_cond_simple_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = 1 ? (40, 50, 60) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 60;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
throw 60;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 60 ]>')

Normalized calls: Same

Final output calls: Same
