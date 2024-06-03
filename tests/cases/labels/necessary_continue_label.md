# Preval test case

# necessary_continue_label.md

> Labels > Necessary continue label
>
> The label is necessary here since an unqualified continue would implicitly target the inner loop.

#TODO

## Input

`````js filename=intro
foo: do {
  $(1, 'outer');
  do {
    $(1, 'inner');
    continue foo;
  } while ($(false));
} while ($(false));
`````

## Pre Normal

`````js filename=intro
foo: {
  let tmpDoWhileFlag$1 = true;
  while (tmpDoWhileFlag$1) {
    {
      $continue: {
        {
          $(1, `outer`);
          {
            let tmpDoWhileFlag = true;
            while (tmpDoWhileFlag) {
              {
                $(1, `inner`);
                break $continue;
              }
              tmpDoWhileFlag = $(false);
            }
          }
        }
      }
    }
    tmpDoWhileFlag$1 = $(false);
  }
}
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag$1 = true;
while (true) {
  if (tmpDoWhileFlag$1) {
    $continue: {
      $(1, `outer`);
      let tmpDoWhileFlag = true;
      while (true) {
        if (tmpDoWhileFlag) {
          $(1, `inner`);
          break $continue;
        } else {
          break;
        }
      }
    }
    tmpDoWhileFlag$1 = $(false);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag$1 = true;
while (true) {
  if (tmpDoWhileFlag$1) {
    $continue: {
      $(1, `outer`);
      while (true) {
        $(1, `inner`);
        break $continue;
      }
    }
    tmpDoWhileFlag$1 = $(false);
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
while (true) {
  if (a) {
    $continue:     {
      $( 1, "outer" );
      while (true) {
        $( 1, "inner" );
        break $continue;
      }
    }
    a = $( false );
  }
  else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'outer'
 - 2: 1, 'inner'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
