# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_unary_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = 1;

    let a = typeof $(x);
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        x = 1;
        const tmpUnaryArg = $(x);
        a = typeof tmpUnaryArg;
        $(a, x);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let x;
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  x = 1;
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
  $(a, x);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
