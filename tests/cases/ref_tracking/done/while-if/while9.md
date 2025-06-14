# Preval test case

# while9.md

> Ref tracking > Done > While-if > While9
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  while (true) {
    if ($) {
      $(x); // x=1 2 Can still see 2 due to outer loop
    } else {
      $(x); // x=1 2 Due to outer loop
      x = 2;
      break;
    }
  }
}
$(x); // unreachable




/*

// SSA
{
  let x = 1;
  function $continue1(x) {
    function $continue2(x) {
      if ($) {
        $(x); // Can still see 2 due to outer loop
      } else {
        $(x);
        x = 2;
        $break2(x);
        return;
      }
      $continue2(x);
      return;
    }
    function $break2(x) {
      $continue1(x);
      return;
    }
    $continue2(x);
    return;
  }
  function $break1() {
    $(x);
  }
  $continue1(x);
}


// Reduction
{
  function $continue2(x) {
    if ($) {
      $(x); // Can still see 2 due to outer loop
      $continue2(x);
    } else {
      $(x);
      $continue2(2);
    }
  }
  $continue2(1);
}

// Recompile
{
  let x = 1;
  while (true) {
    if ($) {
      $(x); // Can still see 2 due to outer loop
    } else {
      $(x);
      x = 2;
    }
  }
}

*/
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~29*/ /*___10__*/ nestedLoop: /*11~29*/ {
    if ($) {
      /*14~18*/ $(/*___18__*/ x);
    } /*19~29*/ else {
      $(/*___23__*/ x);
      /*___27__*/ x = 2;
      break /*___29__*/ nestedLoop;
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23       | none           | 27
  - r @18      | 4,27
  - r @23      | 4,27
  - w @27      | ########## | 18,23       | 4,27           | 27
