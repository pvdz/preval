# Preval test case

# ident_bin.md

> Normalize > Binding > For-a > Ident bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = b + c;false;) $(a, b, c);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3;
{
  let a$1 = b + c;
  while (false) {
    $(a$1, b, c);
  }
}
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let a$1 = b + c;
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
