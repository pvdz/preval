# Preval test case

# second_defaults_to_first.md

> normalize > defaults > second_defaults_to_first
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = 1, b = a) { 
}

f()
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let a;
  {
    let ifTestTmp = $tdz$__a === undefined;
    if (ifTestTmp) {
      a = 1;
    } else {
      a = $tdz$__a;
    }
  }
  let b;
  {
    let ifTestTmp$1 = $tdz$__b === undefined;
    if (ifTestTmp$1) {
      b = a;
    } else {
      b = $tdz$__b;
    }
  }
}
f();
`````

## Output

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let a;
  let ifTestTmp = $tdz$__a === undefined;
  if (ifTestTmp) {
    a = 1;
  } else {
    a = $tdz$__a;
  }
  let b;
  let ifTestTmp$1 = $tdz$__b === undefined;
  if (ifTestTmp$1) {
    b = a;
  } else {
    b = $tdz$__b;
  }
}
f();
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
