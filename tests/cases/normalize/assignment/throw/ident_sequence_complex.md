# Preval test case

# ident_sequence_complex.md

> normalize > assignment > throw > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
throw a = ($(b), $(c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  a = $(c);
  let tmpStmtArg = a;
  throw tmpStmtArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$(2);
a = $(3);
let tmpStmtArg = a;
throw tmpStmtArg;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: <crash[ 3 ]>

Normalized calls: Same

Final output calls: Same
