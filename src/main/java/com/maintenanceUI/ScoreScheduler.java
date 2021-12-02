/**
 * Dattatray Bodhale
	10-Jul-2021
 */
package com.maintenanceUI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;


/**
 * @author Dattatray Bodhale
 *
 */
@Configuration
@EnableScheduling
public class ScoreScheduler {
        
    @Autowired
    private SimpMessagingTemplate template;
    
    @Autowired
    LiveScoreService service;

  //  @Scheduled(fixedRate = 5000)
    public void publishUpdates(){
       System.out.println("HELLO SIIIIII");
        template.convertAndSend("/topic/myscores", service.getScore());
       
    }
 
}