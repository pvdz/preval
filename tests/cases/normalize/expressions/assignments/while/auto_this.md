# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > While > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = this)) $(100);
$(a);

//*/// (end of file artifact)
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  a = this;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  a = this;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
