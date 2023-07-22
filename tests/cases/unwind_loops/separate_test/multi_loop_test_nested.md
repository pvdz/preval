# Preval test case

# multi_loop_test_nested.md

> Unwind loops > Separate test > Multi loop test nested
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  while (test) {
    $('yolo');
    counter = counter + 1;
    test = counter < 10;
  }
}
`````

## Pre Normal

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  while (test) {
    $(`yolo`);
    counter = counter + 1;
    test = counter < 10;
  }
}
`````

## Normalized

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (true) {
  if (test) {
    while (true) {
      if (test) {
        $(`yolo`);
        counter = counter + 1;
        test = counter < 10;
      } else {
        break;
      }
    }
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let counter = 0;
let test = true;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
    test = counter < 10;
    while ($LOOP_UNROLL_10) {
      if (test) {
        $(`yolo`);
        counter = counter + 1;
        test = counter < 10;
      } else {
        break;
      }
    }
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
let b = true;
while (true) {
  if (b) {
    $( "yolo" );
    a = a + 1;
    b = a < 10;
    while ($LOOP_UNROLL_10) {
      if (b) {
        $( "yolo" );
        a = a + 1;
        b = a < 10;
      }
      else {
        break;
      }
    }
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
 - 1: 'yolo'
 - 2: 'yolo'
 - 3: 'yolo'
 - 4: 'yolo'
 - 5: 'yolo'
 - 6: 'yolo'
 - 7: 'yolo'
 - 8: 'yolo'
 - 9: 'yolo'
 - 10: 'yolo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
