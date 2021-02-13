# Preval test case

# ident_sequence_complex.md

> normalize > assignment > for-a > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = ($(b), $(c));false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  let a_1 = $(c);
}
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  let a_1 = $(c);
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same