# Preval test case

# while_try.md

> Ref tracking > Done > Try-random > While try
>
> A let binding defined in an outer block than the nested while

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
if ($) {
  $('if', x);
  try {
    $('try', x);
    while (true) {
      $('try-while', x);
      while (true) {
        $('try-while-while', x);
        if ($) {
          $(x); // Can still see 2 due to outer loop
        } else {
          $(x);
          x = 2;
          break;
        }
      }
      if ($()) {
        $('end?', x);
        break;
      }
      $('no end', x);
    }
    $('after while', x);
  } catch (e) {
    $('catch', x);
  } finally {
    $('finally', x);
  }
  $('posttry', x);
} else {
  $('oh', x);
}
$('end', x);
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ if ($) {
  /*8~139*/ /* stmt(11): */ $(`if`, /*___16__*/ x);
  /* stmt(17): */ let /*___18__*/ $implicitThrow = false;
  /* stmt(20): */ let /*___21__*/ $finalCatchArg = /*___22__*/ undefined;
  /* stmt(23): */ try /*24~93*/ {
    /* stmt(25): */ $(`try`, /*___30__*/ x);
    /* stmt(31): */ while (true) {
      /*33~87*/ /* stmt(35): */ $(`try-while`, /*___40__*/ x);
      /* stmt(41): */ while (true) {
        /*43~66*/ /* stmt(44): */ $(`try-while-while`, /*___49__*/ x);
        /* stmt(50): */ if ($) {
          /*52~56*/ /* stmt(53): */ $(/*___56__*/ x);
        } /*57~66*/ else {
          /* stmt(58): */ $(/*___61__*/ x);
          /* stmt(62): */ /*___65__*/ x = 2;
          /* stmt(66): */ break;
        }
      }
      /* stmt(67): */ const /*___68__*/ tmpIfTest = $();
      /* stmt(71): */ if (/*___72__*/ tmpIfTest) {
        /*73~80*/ /* stmt(74): */ $(`end?`, /*___79__*/ x);
        /* stmt(80): */ break;
      } /*81~87*/ else {
        /* stmt(82): */ $(`no end`, /*___87__*/ x);
      }
    }
    /* stmt(88): */ $(`after while`, /*___93__*/ x);
  } catch (/*___95__*/ e) /*96~115*/ {
    /* stmt(97): */ try /*98~104*/ {
      /* stmt(99): */ $(`catch`, /*___104__*/ x);
    } catch (/*___106__*/ $finalImplicit) /*107~115*/ {
      /* stmt(108): */ $(`finally`, /*___113__*/ x);
      /* stmt(114): */ throw /*___115__*/ $finalImplicit;
    }
  }
  /* stmt(116): */ $(`finally`, /*___121__*/ x);
  /* stmt(122): */ if (/*___123__*/ $implicitThrow) {
    /*124~126*/ /* stmt(125): */ throw /*___126__*/ $finalCatchArg;
  } /*127~139*/ else {
    /* stmt(128): */ $(`posttry`, /*___133__*/ x);
    /* stmt(134): */ $(`end`, /*___139__*/ x);
  }
} /*140~152*/ else {
  /* stmt(141): */ $(`oh`, /*___146__*/ x);
  /* stmt(147): */ $(`end`, /*___152__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 16,30,40,49,56,61,104,113,121,133,139,146,152 | none           | 65
  - r @16      | 4
  - r @30      | 4
  - r @40      | 4,65
  - r @49      | 4,65
  - r @56      | 4,65
  - r @61      | 4,65
  - w @65      | ########## | 40,49,56,61,79,87,93,104,113,121,133,139 | 4,65           | 65
  - r @79      | 65
  - r @87      | 65
  - r @93      | 65
  - r @104     | 4,65
  - r @113     | 4,65
  - r @121     | 4,65
  - r @133     | 4,65
  - r @139     | 4,65
  - r @146     | 4
  - r @152     | 4

$implicitThrow:
  - w @18          | ########## | 123         | none           | none
  - r @123         | 18

$finalCatchArg:
  - w @21          | ########## | 126         | none           | none
  - r @126         | 21

tmpIfTest:
  - w @68          | ########## | 72          | none           | none
  - r @72          | 68

e:
  - w @95          | ########## | not read    | none           | none

$finalImplicit:
  - w @106         | ########## | 115         | none           | none
  - r @115         | 106
